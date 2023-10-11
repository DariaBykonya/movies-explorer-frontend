import './NotFoundPage.css'
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();
      
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="error-page">
                <h1 className="error-page__title">404</h1>
                <p className="error-page__subtitle">Страница не найдена</p>
                <a className='error-page__back' onClick={handleGoBack}>Назад</a>
        </div>    
  )};
  
  export default NotFoundPage