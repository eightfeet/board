import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface FaqPageProps extends RouteComponentProps {}

const FaqPage: React.FC<FaqPageProps> = () => {
  return <>Faq Page</>;
};

FaqPage.defaultProps = {};

export default FaqPage;
