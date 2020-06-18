import React from 'react';
import '../styles/footer.css';
import { RiCopyrightLine } from 'react-icons/ri';

export default function Footer() {
    return (
        <footer>
            <RiCopyrightLine className="footer-icon" size={18} color="#ff7c00" />
            <p className="footer-text">MIPaC 2020</p>
        </footer>
    )
}
