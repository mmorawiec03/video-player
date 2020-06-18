import React from 'react';
import '../styles/header.css';
import { RiVideoLine } from 'react-icons/ri';

export default function Header() {
    return (
        <header>
            <RiVideoLine size={56} color="#ff7c00" />
            <p className="header-text">Video Player</p>
        </header>
    )
}
