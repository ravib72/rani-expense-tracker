import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/globalContext';

function Transactions() {
    const {transactionHis} = useGlobalContext()

    const [...transaction] = transactionHis()

    return (
        <HistoryStyled>
            <h1>Transactions</h1>
            {transaction.map((item) =>{
                const {_id, title, amount, type} = item
                return (
                    <div key={_id} className="transaction-item">
                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {title}
                        </p>

                        <p style={{
                            color: type === 'expense' ? 'red' : 'var(--color-green)'
                        }}>
                            {
                                type === 'expense' ? `-${amount <= 0 ? 0 : amount}` : `+${amount <= 0 ? 0: amount}`
                            }
                        </p>
                    </div>
                )
            })}
        </HistoryStyled>
    )
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .transaction-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

export default Transactions