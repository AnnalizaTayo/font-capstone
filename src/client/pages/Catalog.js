import React from 'react';
import logoA from '../../assets/imgs/pretaporter.svg';
import logoC from '../../assets/imgs/customoutfits.svg';
import logoB from '../../assets/imgs/accs.svg';
import Gallery from '../components/Gallery';
import '../../assets/styles/client/catalog.scss';

export default function Catalog(){
  const Offer = () => {
      return(
              <div className='outermostHome'>
                  <div>
                      <h1>What We Offer</h1>
                  </div>
                  <div className='logo'>
                      <div className='one'>
                          <img src={logoA} alt='pretaporter'/>
                          <img src={logoC} alt='imgscustomoutfits'/>
                          <div className='onetext'>
                              <h1 className='pret'>Pret-A-Porter</h1>
                              <h1 className='custom'>Custom Outfits</h1>
                          </div>
                      </div>
                      <div className='two'>
                          <img src={logoB} alt='accs'/>
                          <h1>Accessories</h1>
                      </div>
                  </div>
              </div>
      )
  }
  return(
    <>
    < Offer />
    < Gallery />
    </>
  )
}