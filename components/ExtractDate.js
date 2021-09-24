const ExtractDate = ({ date }) => {
    const lastUpdate = new Date(date);
    let lastUpdateMonth = '';
    switch (lastUpdate.getMonth()) {
        case 0:
            lastUpdateMonth = 'Jan';
            break;
        case 1:
            lastUpdateMonth = 'Feb';
            break;
        case 2:
            lastUpdateMonth = 'Mar';
            break;
        case 3:
            lastUpdateMonth = 'Apr';
            break;
        case 4:
            lastUpdateMonth = 'May';
            break;
        case 5:
            lastUpdateMonth = 'Jun';
            break;
        case 6:
            lastUpdateMonth = 'Jul';
            break;
        case 7:
            lastUpdateMonth = 'Aug';
            break;
        case 8:
            lastUpdateMonth = 'Sep';
            break;
        case 9:
            lastUpdateMonth = 'Oct';
            break;
        case 10:
            lastUpdateMonth = 'Nov';
            break;
        case 11:
            lastUpdateMonth = 'Dec';
            break;
    
        default:
            break;
    }
    const lastUpdateDate = lastUpdate.getDate() + '-' + lastUpdateMonth + '-' + lastUpdate.getFullYear()
    return (
        <span>
            {lastUpdateDate}
        </span>
    )
}

export default ExtractDate
