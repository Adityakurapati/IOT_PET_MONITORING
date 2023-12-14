// Import the Express framework
const express=require( 'express' );
const path=require( 'path' );

const { fetchDataFromThingSpeak }=require( './controllers/petStateController' )
// Create an Express application
const app=express();

// Set the view engine to use Pug
app.set( 'view engine', 'pug' );

// Set the views directory path
app.set( 'views', path.join( __dirname, 'views' ) );

// Serve the 'css' folder
app.use( '/css', express.static( path.join( __dirname, 'css' ) ) );

// Serve the 'images' folder
app.use( '/images', express.static( path.join( __dirname, 'images' ) ) );

// Define a route for the dog page
app.get( '/mypet', async ( req, res ) =>
{
        // Extract the 'type' parameter from the query string
        const petType=req.query.type;

        var state=await fetchDataFromThingSpeak();
        console.log( state );

        // Render the dog.pug template and pass the 'dogType' parameter
        res.render( 'state', { petType } );
} );

// Set the port for the server to listen on
const PORT=3000;

// Start the server and listen on the specified port
app.listen( PORT, () =>
{
        console.log( `Server running at http://localhost:${ PORT }/` );
} );
