import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();
    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      return res.json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(id);

    if (recipient) return res.json(recipient);

    return res.json({ error: 'Recipient not found or inexistent.' });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number()
        .required()
        .positive()
        .integer(),
      complement: Yup.string(),
      state: Yup.string()
        .required()
        .max(2),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .required()
        .max(10),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: { name: req.body.name, street: req.body.street },
    });

    if (recipientExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number()
        .positive()
        .integer(),
      complement: Yup.string(),
      state: Yup.string().max(2),
      city: Yup.string(),
      zip_code: Yup.string().max(10),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { name, street } = req.body;

    if (!id || Number.isNaN(Number(id))) {
      return res.json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    if (name && name !== recipient.name) {
      const recipientExists = await Recipient.findOne({
        where: { name, street: recipient.street },
      });

      if (recipientExists) {
        return res.status(400).json({ error: 'Recipient already exists' });
      }
    }

    if (street && street !== recipient.street) {
      const recipientExists = await Recipient.findOne({
        where: { name: recipient.name, street },
      });

      if (recipientExists) {
        return res.status(400).json({ error: 'Recipient already exists' });
      }
    }

    const {
      number,
      complement,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name: name || recipient.name,
      street: street || recipient.street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    if (!id || Number.isNaN(Number(id))) {
      return res.json({ error: 'Validation fails' });
    }

    await Recipient.destroy({ where: { id } });

    return res.json({ message: 'Recipient successfully deleted' });
  }
}

export default new RecipientController();
