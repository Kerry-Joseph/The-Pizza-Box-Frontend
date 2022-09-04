import { Link } from "react-router-dom"
import "./page-css/home.scss"

const Home = (props) => {

    const Meal = ({ img, name, content, price, id }) => {
        return (
            <div className="meal" id={id} style={{backgroundImage: `url(${img})`}}>
                <h1 className="meal__name">{name}</h1>
                <h2 className="meal__content">{content}</h2>
                <p className="meal__price">${price}</p>
            </div>
        )
    }

    const loaded = () => {
        const [meal1, meal2, meal3, meal4] = props.meals

        return (
            <div className="home">
                
                <Meal 
                    img={meal1.img} 
                    content={meal1.content} 
                    price={meal1.price} 
                    name={meal1.name}
                    key={meal1._id}
                    id={meal1.name.replaceAll(' ', '-')} 
                />
                <div className="home__main">

                    <Link className="home__link home__link--create-pizza" to="/create-pizza">
                        <h1>Create Own Pizza</h1>
                    </Link>

                    <Link to="/meals" className="home__link home__link--meals"><p>Box Meals</p></Link>
                    <div className="home__meals">
                        <Meal 
                            img={meal2.img} 
                            content={meal2.content} 
                            price={meal2.price} 
                            name={meal2.name}
                            className={meal2.name.replaceAll(' ', '-')}
                            key={meal2._id}
                        />
                        <Meal 
                            img={meal3.img} 
                            content={meal3.content} 
                            price={meal3.price} 
                            name={meal3.name}
                            className={meal3.name.replaceAll(' ', '-')}
                            key={meal3._id}
                        />
                        <Meal 
                            img={meal4.img} 
                            content={meal4.content} 
                            price={meal4.price} 
                            name={meal4.name}
                            className={meal4.name.replaceAll(' ', '-')}
                            key={meal4._id}
                        />
                    </div>
                    <div className="home__rewards">
                        <h1>Join The Box Club</h1>
                    </div>
                </div>
            </div>
        )
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }


    return (
        <div className="home">
            {props.meals ? loaded() : loading()}
        </div>
    )
}

export default Home