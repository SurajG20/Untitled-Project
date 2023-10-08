import styled from 'styled-components';
import { dateFormat } from '../../utils/dateFormat';
import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  dollar,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  trash,
  tv,
  users,
  yt,
} from '../../utils/Icons';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { getIncomes } from '../../features/incomes/incomeActions';
import { getExpense } from '../../features/expenses/expenseActions';
function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) {
  const dispatch = useDispatch();
  const categoryIcon = () => {
    switch (category) {
      case 'salary':
        return money;
      case 'freelancing':
        return freelance;
      case 'investments':
        return stocks;
      case 'stocks':
        return users;
      case 'bitcoin':
        return bitcoin;
      case 'bank':
        return card;
      case 'youtube':
        return yt;
      case 'other':
        return piggy;
      default:
        return '';
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case 'education':
        return book;
      case 'groceries':
        return food;
      case 'health':
        return medical;
      case 'subscriptions':
        return tv;
      case 'takeaways':
        return takeaway;
      case 'clothing':
        return clothing;
      case 'travelling':
        return freelance;
      case 'other':
        return circle;
      default:
        return '';
    }
  };

  const handleDelete = () => {
    deleteItem(dispatch, id);
    getIncomes(dispatch);
    getExpense(dispatch);
  };
  return (
    <IncomeItemStyled indicator={indicatorColor}>
      <div className='icon'>
        {type === 'expense' ? expenseCatIcon() : categoryIcon()}
      </div>
      <div className='content'>
        <h5>{title}</h5>
        <div className='inner-content'>
          <div className='text'>
            <p>
              {dollar} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment}
              {description}
            </p>
          </div>
          <div className='btn-con'>
            <Button
              icon={trash}
              bPad={'0.3rem'}
              bRad={'50%'}
              color={'var(--primary-color'}
              iColor={'#fff'}
              hColor={'var(--color-green)'}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  color: #222260;
  .icon {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 1.2rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    h5 {
      font-size: 1rem;
      padding-left: 2rem;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          font-size: medium;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }
    }
  }
`;

export default IncomeItem;
