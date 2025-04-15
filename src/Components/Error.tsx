import {Component} from "react";
import {CatFactsContext} from "./CatFacts";
import './Error.css'


class ErrorComponent extends Component
{
    render()
    {
        return (
            <CatFactsContext.Consumer>
                {context => {
                    if (!context) {
                        return <div>Ошибка: Контекст не найден</div>;
                    }
                    return (
                        <div className="error-container">
                            <h2>Error</h2>
                            <p>{context.error}</p>
                        </div>
                    );
                }}
            </CatFactsContext.Consumer>
        )
    }
}

export default ErrorComponent;