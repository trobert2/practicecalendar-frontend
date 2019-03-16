import createHistory from 'history/createBrowserHistory';

export default createHistory({
    // TODO: Change the basename to the github pages path
    basename: process.env.NODE_ENV === 'development' ? '' : '/practicecalendar'
});
