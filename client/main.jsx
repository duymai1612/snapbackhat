import React, { Component } from 'react'
import styled from 'styled-components'
import { _helper } from "./components/api/_helper";
import moment from 'moment'

import {
    Title,
    SubTitle,
    Content,
    OptionWrapper,
    ButtonWrapper,
    Image,
    NumberCount,
    SubmitWrapper,
    BuyButton,
} from "./elements";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hat1: 0,
            hat2: 0,
            orders: [],
            storage: [6, 6],
            date: moment().format('YYYY-MM-DD'),
            justBought: false,
        }
    }

    increase = (hatType) => {
        this.setState({ [hatType]: this.state[hatType] + 1 });
    }

    decrease = (hatType) => {
        if (this.state[hatType] > 0) {
            this.setState({ [hatType]: this.state[hatType] - 1 });
        }
    }

    submitOrder = (newOrder) => {
        const { hat1, hat2, date } = newOrder;
        _helper.fetchAPI(
            '/orders',
            {
                hat1,
                hat2,
                date,
            }
        )
        .then((response) => {
            if (response) {
                const { data } = response;
                if (data) {
                    if (data === 'Create order successfully') {
                        alert("Buy successfully");
                        this.getOrders();
                    } else {
                        alert("Buy failed");
                        console.log(data);
                    }
                }
            }
        })
    }

    submitBuy = () => {
        const { hat1, hat2, storage, date, justBought } = this.state;
        if (!justBought) {
            if (hat1 > storage[0] || hat2 > storage[1]) {
                alert("Storage doesn't have enough hats to buy");
            } else if (hat1 + hat2 === 0) {
                alert("You haven't chosen any hat");
            } else {
                this.submitOrder({ hat1, hat2, date });
                this.setState({ justBought: true });
                setTimeout(() => {
                    this.setState({ justBought: false });
                }, 7000);
            }
        } else {
            e.preventDefault();
            alert('Please wait 10s');
        }
    }

    submitDelete = () => {
        _helper.fetchAPI(
            '/orders',
            {},
            [],
            'DELETE'
        )
        .then((response) => {
            if (response) {
                const { data } = response;
                if (data) {
                    alert(data);
                    this.setState({ orders: [] });
                }
            }
        })
    }

    componentDidMount = () => {
        this.getOrders();
    }

    getOrders = () => {
        _helper.fetchGET(
            '/orders',
            {}
        )
        .then((response) => {
            const { status, data } = response;
            if (status == 200) {
                const orders = data;
                this.setState({ orders });
            }
        })
    }

    render() {
        const { hat1, hat2, orders, storage } = this.state;

        return (
            <div>
                <Title>Snapback Hat</Title>
                <SubTitle>Storage of Hat type 1: {storage[0]}</SubTitle>
                <SubTitle>Storage of Hat type 2: {storage[1]}</SubTitle>
                <Content>
                    <OptionWrapper>
                        <Image src="../public/hat1.jpg" />
                        <ButtonWrapper>
                            <button onClick={() => {this.decrease('hat1')}}>-</button>
                            <NumberCount type="tel"> {hat1} </NumberCount>
                            <button onClick={() => {this.increase('hat1')}}>+</button>
                        </ButtonWrapper>
                    </OptionWrapper>
                    <OptionWrapper>
                        <Image src="../public/hat2.jpg" />
                        <ButtonWrapper>
                            <button onClick={() => {this.decrease('hat2')}}>-</button>
                            <NumberCount type="tel"> {hat2} </NumberCount>
                            <button onClick={() => {this.increase('hat2')}}>+</button>
                        </ButtonWrapper>
                    </OptionWrapper>
                </Content>
                <SubmitWrapper>
                    <BuyButton onClick={this.submitBuy}>Buy</BuyButton>
                </SubmitWrapper>
                <SubmitWrapper>
                    <BuyButton onClick={this.submitDelete}>Delete All Order(s)</BuyButton>
                </SubmitWrapper>
                <table className="table" id="bstable" >
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Hat 1</th>
                            <th scope="col">Hat 2</th>
                            <th scope="col">Date Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr key={order._id}>
                                <th scope="row"> {i + 1} </th>
                                <td> {order.hat1} </td>
                                <td> {order.hat2} </td>
                                <td> {order.date} </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}