import * as Yup from 'yup';

import Delivery from '../models/Delivery';
import File from '../models/File';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Deliveryman,
          attributes: ['id', 'name'],
        },
        {
          model: Recipient,
          attributes: ['name', 'street', 'number'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string()
        .required()
        .max(255),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    if (!(await Recipient.findByPk(req.body.recipient_id))) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    const deliveryman = await Deliveryman.findByPk(req.body.deliveryman_id);

    if (!deliveryman) {
      return res.status(400).json({ error: 'Deliveryman not found' });
    }

    const { product, recipient_id, deliveryman_id } = req.body;

    const { id } = await Delivery.create({
      product,
      recipient_id,
      deliveryman_id,
    });

    // Send email to deliveryman
    const delivery = { product, deliveryman };
    await Queue.add(NewDeliveryMail.key, { delivery });

    return res.json({ id, product, recipient_id, deliveryman_id });
  }

  async update(req, res) {
    // #region Validações
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      signature_id: Yup.number(),
      product: Yup.string().max(255),
      canceled_at: Yup.date(),
      start_at: Yup.date(),
      end_at: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      return res.json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    const { recipient_id, deliveryman_id, signature_id } = req.body;

    if (recipient_id) {
      const exists = await Recipient.findByPk(recipient_id);

      if (!exists) {
        return res.status(400).json({ error: 'Recipient not found' });
      }
    }

    if (deliveryman_id) {
      const exists = await Deliveryman.findByPk(deliveryman_id);

      if (!exists) {
        return res.status(400).json({ error: 'Deliveryman not found' });
      }
    }

    if (signature_id) {
      const exists = await File.findByPk(signature_id);

      if (!exists) {
        return res.status(400).json({ error: 'Signature not found' });
      }
    }
    // #endregion

    const { product, canceled_at, start_at, end_at } = await delivery.update(
      req.body
    );

    return res.json({
      product,
      signature_id,
      recipient_id,
      deliveryman_id,
      canceled_at,
      start_at,
      end_at,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      return res.json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    await Delivery.destroy({ where: { id } });

    return res.json({ message: 'Delivery successfully deleted' });
  }
}

export default new DeliveryController();
