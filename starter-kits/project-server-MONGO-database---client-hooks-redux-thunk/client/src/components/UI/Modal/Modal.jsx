import './Modal.scss';
import { MiniButton } from '../../';

const Modal = (props) => {
	const { modalData, onRemoveButtonClick, onCloseModalButtonClick } = props;
	const { isModalDisplay, id, name } = modalData;
	return (
		<div className={`modal${isModalDisplay ? ' active' : ''}`}>
			<div className="modal-content">
				<div className="close">
					<i className="fa fa-times" title="Remove" aria-hidden="true" onClick={onCloseModalButtonClick}></i>
				</div>
				<div className="message">
					Are you sure you want to delete '{name}' ({id})?
				</div>
				<div className="buttons">
					<MiniButton
						buttonText={'Remove'}
						buttonTitle={'Remove'}
						onClick={onRemoveButtonClick}
					/>
					<MiniButton
						buttonText={'Cancel'}
						buttonTitle={'Cancel'}
						onClick={onCloseModalButtonClick}
					/>
				</div>
			</div>
			<div className="overlay"></div>
		</div>
	);
};

export default Modal;