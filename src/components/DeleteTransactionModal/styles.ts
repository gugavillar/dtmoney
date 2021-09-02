import styled from 'styled-components';

export const Container = styled.div`
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    img {
      width: 40px;
      display: block;
      margin: 0 auto;
    }
    p {
      text-align: center;
      margin: 2rem 0;
    }
    div.buttons {
      display: flex;
      align-items: center;
      justify-content: space-around;

      button {
        font-size: 1rem;
        height: 3rem;
        border-radius: 0.25rem;
        border: 0;
        padding: 0 2rem;
        color: #FFF;
      }
      & :first-child {
        background-color: var(--red);
      }
      & :last-child {
        background-color: var(--green);
      }
    }
`