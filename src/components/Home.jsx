import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import Cryptocurrencies from './Cryptocurrencies';
import Loader from './Loader';
import News from './News';

export default function Home() {
  const { Title } = Typography;
  const { data, isFetching } = useGetCryptosQuery(10);
  console.log(data);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;
  return (
    <>
      <Title className='heading' level={2}>
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title='Total Crypocurrencies'
            value={globalStats.total}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Exchanges'
            value={millify(globalStats.totalExchanges)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Market Cap'
            value={millify(globalStats.totalMarketCap)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Total 24h Volume'
            value={millify(globalStats.totalMarkets)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title='Total Markets'
            value={millify(globalStats.total24hVolume)}
          ></Statistic>
        </Col>
      </Row>
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={4} className='show-more'>
          <Link to='/cryptocurrencies'>Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>
          Latest Cryptocurrency News
        </Title>
        <Title level={4} className='show-more'>
          <Link to='/news'>Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}
