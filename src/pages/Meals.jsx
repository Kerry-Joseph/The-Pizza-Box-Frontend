// IMPORTS ----
import Meal from "./page-components/Meal"
import "./page-css/Meals.scss"
import "./page-css/boxBundle.scss"

const Meals = ({ meal }) => {
    // LOADED ----
    const loaded = () => {
        
        const [m0,m1,m2,m3,m4,m5] = meal
        
        return (
            <div className="meals">

                    <div className="meals__box-bundle">
                        <Meal
                            content={m0.content}
                            img={m0.img} 
                            name={m0.name} 
                            price={m0.price} 
                            id={m0.name.replaceAll(' ', '-')}
                        />
                    </div>

                    <div className="meals__main">
                        <Meal
                            content={m1.content}
                            img={m1.img} 
                            name={m1.name} 
                            price={m1.price} 
                            id={m1.name.replaceAll(' ', '-')}
                        />
                        <Meal
                            content={m2.content}
                            img={m2.img} 
                            name={m2.name} 
                            price={m2.price} 
                            id={m2.name.replaceAll(' ', '-')}
                        />
                        <Meal
                            content={m3.content}
                            img={m3.img} 
                            name={m3.name} 
                            price={m3.price} 
                            id={m3.name.replaceAll(' ', '-')}
                        />
                        <Meal
                            content={m4.content}
                            img={m4.img} 
                            name={m4.name}
                            price={m4.price} 
                            id={m4.name.replaceAll(' ', '-')}
                        />
                        <Meal
                            content={m5.content}
                            img={m5.img} 
                            name={m5.name} 
                            price={m5.price} 
                            id={m5.name.replaceAll(' ', '-')}
                        />
                    </div>

            </div>
        )
    }



    // LOADING ----
    const loading = () => {
        return (
            <h1>loading...</h1>
        )
    }



    // RETURN ----
    return (
        <div>
            {meal ? loaded() : loading()}
        </div>
    )
}



// EXPORTS ----
export default Meals