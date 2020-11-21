import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface BrandPageProps extends RouteComponentProps {}

const BrandPage: React.FC<BrandPageProps> = () => {
  return <>Brand Page</>;
};

BrandPage.defaultProps = {};

export default BrandPage;
