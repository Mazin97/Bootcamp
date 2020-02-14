import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 20px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }

  a {
    color: #7159c1;
    font-size: 16px;
    text-decoration: none;
  }
`;

export const IssueList = styled.ul`
  padding-top: 15px;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 10px;
  }

  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 16px;
    }

    a {
      text-decoration: none;
      color: #333;

      &:hover {
        color: #7159c1;
      }
    }

    span {
      background: #eee;
      color: #333;
      border-radius: 2px;
      font-size: 12px;
      font-weight: 600;
      height: 20px;
      padding: 3px 4px;
      margin-left: 10px;
    }

    p {
      margin-top: 5px;
      font-size: 12px;
      color: #999;
    }
  }
`;

export const IssueFilter = styled.div`
  padding-top: 30px;
  margin-top: 30px;
  border-top: 1px solid #eee;
  text-align: center;
  font-size: 18px;
  font-weight: bold;

  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
  }

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;

    padding-top: 25px;
  }
`;

export const IssueFilterLi = styled.li`
  border: 1px solid #eee;
  border-radius: 3px;
  margin: 5px;
  padding: 7px 15px;
  cursor: pointer;
  background: ${props => (props.state === props.itemKey ? '#7159c1' : '#eee')};
  color: ${props => (props.state === props.itemKey ? '#fff' : '#000')};
  transition: all 0.3s ease-in-out;

  &:hover {
    background: #7159c1;
    color: #fff;
  }
`;
