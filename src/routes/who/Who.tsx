import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface WhoPageProps extends RouteComponentProps {}

const WhoPage: React.FC<WhoPageProps> = () => {
  return <>Who Page</>;
};

WhoPage.defaultProps = {};

export default WhoPage;
