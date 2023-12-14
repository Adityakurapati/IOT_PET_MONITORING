// Import the Express framework
const express=require( 'express' );
const path=require( 'path' );

const { fetchDataFromThingSpeak }=require( './controllers/petStateController' );

// Create an Express application
const app=express();

// Set the view engine to use Pug
app.set( 'view engine', 'pug' );

// Set the views directory path
// app.set( 'views', path.join( __dirname, 'public/views' ) );

// Serve Static Files
app.use( express.static( path.join( __dirname, 'public' ) ) );

// Define a route for the dog page
app.get( '/mypet', async ( req, res ) =>
{
        // Extract the 'type' parameter from the query string
        // const petType = req.query.type;
        // var petType='active'; // Assuming 'active' for testing purposes

        var state=await fetchDataFromThingSpeak();
        var petType=state==1? 'active':'sleeping';

        // Render the "petState.pug" template
        res.render( 'petState', { petType } );
} );

// Set the port for the server to listen on
const PORT=3000;

// Start the server and listen on the specified port
app.listen( PORT, () =>
{
        console.log( `Server running at http://localhost:${ PORT }/` );
} );
