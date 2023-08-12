import React,{ useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';


// install font awesome thru this https://fontawesome.com/docs/web/use-with/react/

function Gallery() {
    const [model, setModel] = useState(false);
    const [tempimgSrc, setTempImgSrc] = useState('');
    const [productIds, setProductIds] = useState([]);
    
    
    useEffect(() => {        
        fetch(`/products/allproductids`)
            .then(response => response.json())
            .then(data => {
                const ids = data.products.map(product => product._id);
                setProductIds(ids);
            })
            .catch(error => console.error('Error fetching product IDs:', error));
    },[])

        
    const getImg = (imgSrc) => {
        setTempImgSrc(imgSrc);
        setModel(true);
    }

    return(
        
        <div className='gallery-wrapper'>
            <div id='h1Gal'>
                <h1>Gallery</h1>
            </div>
            <div className={model? "model open" : "model"}>
                <img src={tempimgSrc} alt=''/>
                <FontAwesomeIcon icon={faCircleXmark} size="lg" id='x'  onClick={()=>setModel(false)}/>
            </div>
            
            <div className='gallery'>
                    {productIds.map((productId, index) =>{
                        const imgSrc = `/products/products-image/${productId}`;
                        console.log(imgSrc);
                        return(
                            <div className='images' key={index} onClick={() => getImg(imgSrc)} >
                                <img src={imgSrc} alt=''/> 
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Gallery;

