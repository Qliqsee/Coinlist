import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';
import { useEffect, useState } from 'react';

export default function Cryptocurrencies({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  console.log(cryptos);

  if (isFetching) return <Loader />;
  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
          <Input
            placeholder='Search Cryptocurrency'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row className='crypto-card-container' gutter={[32, 32]}>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} key={cryptos.id} className='crypto-card'>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className='crypto-image'
                    src={currency.iconUrl}
                    alt='img'
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.price)}</p>
                <p>Daily Change: {millify(currency.price)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
