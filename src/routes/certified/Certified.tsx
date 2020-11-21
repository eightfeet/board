import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface CertifiedPageProps extends RouteComponentProps {}

const CertifiedPage: React.FC<CertifiedPageProps> = () => {
  return <>Certified Page</>;
};

CertifiedPage.defaultProps = {};

export default CertifiedPage;
