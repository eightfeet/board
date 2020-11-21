import { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import s from './Portal.scss';

interface IPortalProps {
  className?: string;
  mask?: boolean;
  through?: boolean;
  onClickOverlay?: (event: MouseEvent) => void;
}

const mountPoint = document.getElementById('react-modal') || document.body;
let scrollLockRef = 0;
let scrollTop = 0;

class Portal extends Component<IPortalProps> {
  public static defaultProps = {
    mask: true,
  };

  private el: HTMLElement;

  constructor(props: IPortalProps) {
    super(props);

    this.el = document.createElement('div');
    this.el.addEventListener('click', this.onClickOverlay);
    this.el.className = classNames(s.portal, props.className, {
      [s.mask]: props.mask,
      [s.through]: props.through,
    });
  }

  public componentDidMount() {
    mountPoint.appendChild(this.el);
    scrollLockRef += 1;
    if (scrollLockRef === 1) {
      scrollTop = document.documentElement!.scrollTop || document.body.scrollTop;
      document.body.classList.add(s.lockScroll);
      document.body.style.top = `${-scrollTop}px`;
    }
  }

  public componentWillUnmount() {
    mountPoint.removeChild(this.el);
    scrollLockRef -= 1;
    if (scrollLockRef === 0) {
      document.body.classList.remove(s.lockScroll);
      document.body.style.top = '';
      setTimeout(() => {
        window.scrollTo(0, scrollTop);
      }, 0);
    }
  }

  private onClickOverlay = (event: MouseEvent) => {
    const { onClickOverlay } = this.props;
    if (event.target === this.el && onClickOverlay) {
      onClickOverlay(event);
    }
  };

  public render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}

export default Portal;
