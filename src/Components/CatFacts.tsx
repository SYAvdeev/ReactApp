import {Component, createContext} from "react";
import './FactsList.css'
import ErrorComponent from "./Error.tsx";
import FactsListComponent from "./FactsList.tsx";

enum State { Initial, Facts, Error}

export interface CatFactsContextType {
    error: string;
    json?: any;
    fetchCatFacts: (url: string) => Promise<void>;
}

const CatFactsContext = createContext<CatFactsContextType>({
    error: 'Error message',
    json: undefined,
    fetchCatFacts: async () => { } });

interface CatFactsStateContract {
    current_state: State,
    error: string,
    json: any | undefined
}

class CatFactsComponent extends Component<{}, CatFactsStateContract>
{
    constructor(props: {}) {
        super(props);
        this.state = {
            current_state: State.Initial,
            error: "",
            json: undefined
        };
    }

    fetchCatFacts = async (url: string) => 
    {
        try {
            const response = await fetch(url);
            
            if (response.ok)
            {
                const json = await response.json();
                this.setState({
                    current_state: State.Facts,
                    json: json});
            }
            else
            {
                this.setState({
                    current_state: State.Error,
                    error: `Error: ${response.status} ${response.statusText}`});
            }    
        }
        catch (error) {
            const errorText = "Error fetching cat facts:";
            console.error(errorText, error);
            this.setState({
                current_state: State.Error,
                error: `${errorText} ${error}`});
            return;
        }
    }
    
    render()
    {
        console.log('this.state', this.state);

        const handleClick = async (e: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
            e.preventDefault();
            await this.fetchCatFacts("https://catfact.ninja/facts");
        };

        return (
            <CatFactsContext.Provider value={{
                error: this.state.error,
                json: this.state.json,
                fetchCatFacts: this.fetchCatFacts }}>
                <h1>Cat Facts</h1>

                {this.state.current_state == State.Facts ? <FactsListComponent /> :
                    this.state.current_state == State.Error ? <ErrorComponent /> : ""}
                
                <button onClick={event => handleClick(event)}>Get Cat Facts</button>
            </CatFactsContext.Provider>

        )
    }
}

export {CatFactsComponent, CatFactsContext};