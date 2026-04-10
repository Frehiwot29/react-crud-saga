import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { productSearch } from '../redux/productAction'
import { navigateToAnnouncement, incrementAnnouncementClick } from '../redux/actions';

const Header = () => {
    const result = useSelector((state) => state.cartData);
    const clickCount = useSelector((state) => state.announcementCount);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const announcementColor = useMemo(() => {
        const startDate = new Date('2026-02-29'); // Set this to "today" to start the 7-day counter
        const today = new Date();

        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const current = new Date(today).setHours(0, 0, 0, 0);
        const diffInDays = Math.floor((current - start) / (1000 * 60 * 60 * 24));

        return (diffInDays >= 0 && diffInDays < 7) ? 'yellow' : 'grey';
    }, []);

    const handleAnnouncementClick = () => {
        dispatch(incrementAnnouncementClick());
        dispatch(navigateToAnnouncement(navigate));
    };

    console.warn("data in header", result);
    return (
        <div className="header">
            <Link to="/"><h1 className='logo'>E-Comm</h1></Link>
            <div className='search-box'>
                <input type="text" onChange={(event) => dispatch(productSearch(event.target.value))} placeholder='Search Product' />
            </div>
            <div className="announcement-wrapper" style={{ display: 'flex', alignItems: 'center', margin: '0 10px' }}>

                <button
                    onClick={handleAnnouncementClick}
                    style={{
                        backgroundColor: announcementColor,
                        color: 'black',
                        border: 'none',
                        padding: '5px 15px',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginLeft: '8px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    Announcement
                </button>
                <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={handleAnnouncementClick}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3119/3119338.png"
                        alt="notification-icon"
                        style={{ width: '25px', height: '25px' }}
                    />
                    {clickCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            height: '16px',
                            width: '16px',
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            border: '1px solid white',
                            boxShadow: '0 0 4px rgba(0,0,0,0.3)',
                            color: 'white',
                            fontSize: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                        }}>{clickCount}</span>
                    )}
                </div>
            </div>
            <Link to="/cart">
                <div className="cart-div">
                    <span>{result.length}</span>
                    <img src="https://cdn-icons-png.flaticon.com/512/263/263142.png" alt="" />
                </div></Link>
        </div>
    )
}

export default Header;