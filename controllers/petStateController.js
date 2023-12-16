const axios=require( 'axios' );

const channelId='2350971'; // Replace with your ThingSpeak channel ID
// const apiKey='H88K9TSQ6U7PU6UY'; // Replace with your ThingSpeak API key
const apiKey='I2X6WHC6BGJ212TG'; // Replace with your ThingSpeak API key
const apiUrl=`https://api.thingspeak.com/channels/${ channelId }/feeds.json?api_key=${ apiKey }`;

const fetchDataFromThingSpeak=async () =>
{
        try
        {
                const response=await axios.get( apiUrl );

                if ( response.status!==200 )
                {
                        throw new Error( `Error: ${ response.statusText }` );
                }

                const data=response.data;
                return data;
        } catch ( error )
        {
                console.error( 'Error fetching data from ThingSpeak:', error.message );
        }
};

// Example usage
fetchDataFromThingSpeak()
        .then( ( data ) =>
        {
                console.log( 'ThingSpeak Data:', data.feeds[ data.feeds.length-1 ] );
        } )
        .catch( ( error ) =>
        {
                console.error( 'Error:', error.message );
        } );

module.exports={ fetchDataFromThingSpeak };