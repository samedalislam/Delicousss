import { useEffect, useState } from "react"
import styled from "styled-components"
import { useParams } from "react-router-dom"

const Recipe = () => {
    const [details, setDetails] = useState({})
    const [activeTab, setActiveTab] = useState('instructions')

    let params = useParams();
    const fetchDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=20780ebf9fd94dedb659a65026d56e35`)
        const detailsData = await data.json()
        setDetails(detailsData)
    }

    useEffect(() => {
        fetchDetails();
    }, [params.name])

    return (
        <DetailsWrapper>
            <div>
                <h2>{details.title}</h2>
                <img src={details.image} alt="" />
            </div>
            <Info>
                <Button onClick={() => setActiveTab('instructions')} className={activeTab === 'instructions' ? 'active' : ''}>Instructions</Button>
                <Button onClick={() => setActiveTab('ingredients')} className={activeTab === 'ingredients' ? 'active' : ''}> Ingredients</Button>
                {
                    activeTab === 'instructions' && (
                        <div>
                            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
                            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
                        </div>
                    )
                }
                {activeTab === 'ingredients' && (
                    <ul>
                        {
                            details.extendedIngredients.map(ingredient => (
                                <li key={ingredient.id}>{ingredient.original}</li>
                            ))
                        }
                    </ul>
                )}

            </Info>
        </DetailsWrapper >
    )
}


const DetailsWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    padding: 0 2rem;

    .active{
        background: linear-gradient(45deg, #494949, #313131);
        color: #fff;
    }

    h2{
        margin-bottom: 2rem;
    }

    h3{
        margin-top: 2rem;
    }

    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }

    ul{
        margin-top: 2rem;
    }
`

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: #fff;
    border: 2px solid #000;
    margin-right: 2rem;
    font-weight: 600;
    cursor: pointer;
`

const Info = styled.div`
    max-lines: 10rem;
    margin-left: 3rem;
`

export default Recipe