import {Component} from "react";
import './FactsList.css'
import {CatFactsContext} from "./CatFacts.tsx";

interface FactsListStateContract {
    current_page: number
    data: Data[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Link[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
}

interface Data {
    fact: string
    length: number
}

interface Link {
    url?: string
    label: string
    active: boolean
}

class FactsListComponent extends Component<{}, FactsListStateContract>
{
    constructor(props: {}) {
        super(props);
        this.state = {
            current_page: 0,
            data: [],
            first_page_url: "",
            from: 0,
            last_page: 0,
            last_page_url: "",
            links: [],
            next_page_url: "",
            path: "",
            per_page: 0,
            prev_page_url: 0,
            to: 0,
            total: 0
        };
    }
    
    render()
    {
        return (
            <CatFactsContext.Consumer>
                {context => {
                    if (!context) {
                        return <div>Ошибка: Контекст не найден</div>;
                    }

                    const handlePageClick = async (e: React.MouseEvent<HTMLAnchorElement>, url: string): Promise<void> => {
                        e.preventDefault();
                        await context.fetchCatFacts(url);
                    };
                    
                    this.state = context.json as FactsListStateContract;
                    
                    return (
                        <div>
                            <div className="facts">
                                <ul>
                                    {this.state.data.map((fact, index) => (
                                        <li key={index}>{fact.fact}</li>
                                    ))}
                                </ul>
                            </div>
                            <nav className="pagination">
                                <ul>
                                    <li><a href="#" onClick={(e) => handlePageClick(e, this.state.first_page_url!)}>&laquo;</a></li>
                                    {this.state.links.map(function (link, index){
                                        if (!link.active && link.url != null) {
                                            return <li key={index}>
                                                <a href="#" onClick={(e) => handlePageClick(e, link.url!)}>
                                                    {link.label}
                                                </a>
                                            </li>
                                        }
                                        else{
                                            return <li key={index}>{link.label}</li>
                                        }})}
                                    <li><a href="#" onClick={(e) => handlePageClick(e, this.state.last_page_url!)}>&raquo;</a></li>

                                </ul>
                            </nav>
                            <button></button>
                        </div>
                    );
                }}
            </CatFactsContext.Consumer>
        )
    }
}

export default FactsListComponent;