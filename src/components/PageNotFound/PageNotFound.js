import './PageNotFound.css'
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();
      
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <main className="error-page">
            <h1 className="error-page__title">404</h1>
            <p className="error-page__subtitle">Страница не найдена</p>
            <a className='error-page__back' onClick={handleGoBack}>Назад</a>
        </main>    
  )};
  
  export default PageNotFound