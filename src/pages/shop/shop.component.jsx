import React from 'react';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {updateCollection} from '../../redux/shop/shop.actions'
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

import WithSpinner from '../../components/with-spinner/with-spinner.component'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage); 

class ShopPage extends React.Component{
    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null; 

    componentDidMount(){
        const { updateCollections} = this.props

        const collectionRef = firestore.collection('colletions');
 
        collectionRef.get().then(snapshot => {
           const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
           updateCollections(collectionsMap);
           this.setState({loading: false}); 
        })
    }
    render(){
        const {match} = this.props;
        const {loading} = this.state;
        return(
            <div className='shop-page'>  
            <Route exact path={`${match.path}`}  render={(props)=><CollectionsOverviewWithSpinner IsLoading={loading} {...props}/>} />
            <Route path={`${match.path}/:collectionId`} render={(props)=><CollectionPageWithSpinner IsLoading={loading} {...props}/>} />
            </div>
        )
    }
} 
const mapDispatchToProps = (dispatch) => {
    return {
        updateCollections: (collectionsMap) => dispatch(updateCollection(collectionsMap))
    }
}
export default connect(null, mapDispatchToProps)(ShopPage)