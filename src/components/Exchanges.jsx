import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;
 // Note: To access this endpoint you need premium plan
  if (isFetching) return <Loader />;
  if (!exchangesList || exchangesList.length === 0) {
    return <Typography.Text>No exchange data available. Please check your API plan.</Typography.Text>;
  }

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
  {exchangesList.map((exchange) => (
    <Col span={24} key={exchange.uuid}>
      <Collapse>
        <Panel
          showArrow={false}
          header={(
            <Row>
              <Col span={6}>
                <Text><strong>{exchange.rank}.</strong></Text>
                <Avatar className="exchange-image" src={exchange.iconUrl} />
                <Text><strong>{exchange.name}</strong></Text>
              </Col>
              <Col span={6}>${millify(exchange.volume)}</Col>
              <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
              <Col span={6}>{millify(exchange.marketShare)}%</Col>
            </Row>
          )}
        >
          {HTMLReactParser(exchange.description || '')}
        </Panel>
      </Collapse>
    </Col>
  ))}
</Row>

    </>
  );
  
  
};

export default Exchanges;