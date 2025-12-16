// src/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from './components/header.jsx'; 
import illustrationImage from './assets/Pexels Photo by Karola G.png';

function Home() {
    
    // STYLE UTAMA HERO SECTION
    const heroStyle = {
        backgroundColor: '#E0F7FA', 
        
        color: '#000000ff', 
        
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        
        padding: '0px 30px 50px 30px', 
    };

    // STYLE UNTUK KOLOM TEKS (KIRI)
    const textColumnStyle = {
        flex: 1, 
        paddingRight: '50px',
        maxWidth: '50%', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    };

    // STYLE JUDUL
    const titleStyle = { 
        fontSize: '80px', 
        fontWeight: 'bold', 
        margin: '0 0 40px 0', 
        lineHeight: '1.1',
        
        paddingLeft: '140px',
        fontFamily: 'Inter, sans-serif'
    };

    // STYLE TOMBOL SIGN UP
    const signUpButtonStyle = { 
        backgroundColor: '#f4bd77ff', 
        color: '#ffffff', 
        padding: '25px 0px',
        borderRadius: '20px',
        textDecoration: 'none',
        fontWeight: 'normal',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: '30px',
        fontSize: '18px',
        cursor: 'pointer',
        marginLeft: '140px', 
    };
    
    // STYLE KOTAK ILUSTRASI (KANAN)
    const illustrationBoxStyle = { 
        flex: 0.5, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#72C7D1',
        
        width: '500px', 
        height: '500px', 
        borderRadius: '50%', 
        
        position: 'relative', 
        overflow: 'hidden',
    };
    
    const illustrationTextStyle = {
        fontSize: '40px', 
        color: 'white' 
    };

    const imageStyle = {
        position: 'absolute', 
        objectFit: 'cover',   
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
    };

    return (
        <>
            <Header /> 
            
            <div style={heroStyle}>
                
                {/* Kolom Teks Kiri */}
                <div style={textColumnStyle}>
                    <h1 style={titleStyle}>
                        Malang's<br />
                        First Choice in<br />
                        Cleaning
                    </h1>
                    
                    {/* Tombol Sign Up */}
                    <Link to="/signup" style={signUpButtonStyle}> 
                        Sign Up for Free Pickup & Delivery
                    </Link>
                </div>

                {/* Kotak Ilustrasi Kanan */}
                <div style={illustrationBoxStyle}> 
                    <img 
                        src={illustrationImage} 
                        alt="Ilustrasi Laundry" 
                        style={imageStyle} 
                    />
                </div>
            </div>
        </>
    );
}

export default Home;