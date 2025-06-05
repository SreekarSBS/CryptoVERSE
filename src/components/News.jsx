import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Typography, Spin } from 'antd';
import moment from 'moment';

const { Title, Text } = Typography;

const News = ({ simplified }) => {
  const [cryptoNews, setCryptoNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://cryptocurrency-news2.p.rapidapi.com/v1/cryptodaily', {
        headers: {
          'x-rapidapi-key': '1dfd8c43b6msh7bb870395daac58p1c733bjsn4a7f6c903cb6',
          'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com',
        },
      });
      const data = await response.json();
      setCryptoNews(data?.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Spin size="large" />;
  if (error) return <p>Error loading news...</p>;
  if (!cryptoNews.length) return <p>No news found.</p>;

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews.slice(0, simplified ? 6 : 12).map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card" style={{ height: 300, display: 'flex', flexDirection: 'column' }}>
            <a href={news.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', height: 100 }}>
                <img
                  src={news.thumbnail}
                  alt="news"
                  style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 16, borderRadius: 8 }}
                />
                <Title level={4} className="news-title" style={{ margin: 0, fontSize: 16 }}>
                  {news.title.length > 60 ? news.title.substring(0, 57) + '...' : news.title}
                </Title>
              </div>
              <div style={{ flexGrow: 1 }}>
                <Text>
                  {news.description.length > 100 ? news.description.substring(0, 97) + '...' : news.description}
                </Text>
              </div>
              <Text type="secondary">{moment(news.createdAt).fromNow()}</Text>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
