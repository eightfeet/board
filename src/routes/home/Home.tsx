import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { RootState, Dispatch } from '~/store';
import { createPoint } from './process';

import s from './Home.scss';

const mapState = (state: RootState) => ({
  dolphins: state.dolphins,
  sharks: state.sharks,
});

const mapDispatch = (dispatch: Dispatch) => ({
  incrementSharks: () => dispatch.sharks.increment(1),
  incrementSharksAsync: () => dispatch.sharks.incrementAsync(1),
  incrementSharksAsync2: () => dispatch({ type: 'sharks/incrementAsync', payload: 2 }),
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;
interface HomePageProps extends RouteComponentProps {
  [keys: string]: any;
}

type Props = StateProps & DispatchProps & HomePageProps;

const HomePage: React.FC<Props> = ({
  history,
  sharks,
  incrementSharks,
  incrementSharksAsync,
  incrementSharksAsync2,
}) => {
  useEffect(() => {
    // effect
    const points = createPoint(
      {
        phone: '13622809426', // 积分手机
        antifakecode: '8628709951314599', // 16位产品防伪码
      },
      s.formbox,
      history,
    );

    // 微调样式
    (points as any).message.state.style.content.borderRadius = '0.4rem';
  }, []);
  return (
    <div className={s.root}>
      <div className={s.main}>
        <div className={s.info}>
          <div className={classNames(s.logo, s.margin)} />
        </div>
        <div className={classNames(s.block, s.margin)}>
          <div className={s.form} id={s.formbox} />
          <div className={s.banner} />
          <div style={{ width: 200 }}>
            <h3>Sharks</h3>
            <h1>{sharks}</h1>
            <button type="button" onClick={incrementSharks}>
              +1
            </button>
            <button type="button" onClick={incrementSharksAsync}>
              Async +1
            </button>
            <button type="button" onClick={incrementSharksAsync2}>
              Async +2
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

HomePage.defaultProps = {};

export default connect(mapState, mapDispatch)(HomePage);
