import { useEffect, useState } from "react";
import StripeCheckout from 'react-stripe-checkout';
import useRequest from "../../hooks/use-request";
import Router from 'next/router';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLef ] = useState(0);

  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: () => Router.push('/orders')
  });


  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLef(Math.round(msLeft/1000));
    }

    findTimeLeft();
    const timeId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []); 

  if(timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout 
        token={({ id }) => doRequest({ token: id})} 
        stripeKey="pk_test_51KCnrMSDIODPOA0Y0oJ7TTjqGdZUClyjlz87oZW8lZWjl2REl75mh5sAky1pk5HzHQr7V6OabhYWNkJhjRtVuiRM00zdxDvBpv"
        amount={order.ticket.price}
        email={currentUser.email}
      />
      {errors}
    </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;