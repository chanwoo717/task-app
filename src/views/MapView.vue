<template>
    <div class="gmap">
        <h1>Find your Location</h1>
        <small>or search for a new one!</small>
        <form @submit.prevent="submitSearch" class="searchLoca">
            <input ref="searchLocation" type="text" placeholder="Insert full location name" class="searchBox" />
            <button type="submit">Search <img src='../assets/search_icon.png' alt=''> </button>
        </form>
        <div id="map"></div>
    </div>
</template>
<script>
/* eslint-disable no-undef */
import { Loader } from '@googlemaps/js-api-loader';

export default {
    name: 'MapView',
    data() {
        return {
            map: null,
            placesService: null
        };
    },
    mounted() {
        const loader = new Loader({
            apiKey: 'AIzaSyCwdVuuM_ufmIHo2w2q_W0_yTKG7UGdQpE',
            libraries: ['places']
        });
        loader.load().then(() => {
            this.initMap();
        });
    },
    methods: {
        initMap() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    this.map = new google.maps.Map(document.getElementById('map'), {
                        center: userLocation,
                        zoom: 15
                    });
                    new google.maps.Marker({
                        position: userLocation,
                        map: this.map,
                        title: 'You are here'
                    });
                    this.placesService = new google.maps.places.PlacesService(this.map);
                }, () => {
                    alert('Geolocation failed. Please allow location access.');
                });
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        },
        submitSearch() {
            const inputText = this.$refs.searchLocation.value;
            if (!inputText) return;
            const request = {
                query: inputText,
                fields: ['geometry']
            };
            this.placesService.findPlaceFromQuery(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
                    const place = results[0];
                    const location = place.geometry.location;
                    this.map.setCenter(location);
                    new google.maps.Marker({
                        position: location,
                        map: this.map,
                        title: place.name
                    });
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.searchLoca {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    width: 500px;
}

.searchBox {
    width: 300px;
    font-size: 1.25rem;
    padding: 10px;
    border-radius: 10px;
    border: none;
}

.searchLoca>button {
    height: 43px;
    background-image: linear-gradient(to right, rgb(253, 97, 123), rgb(93, 180, 66));
    border-style: hidden;
    color: white;
    padding: 5px 10px;
    border-radius: 10px;
    margin-left: 5px;
    cursor: pointer;
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

button>img {
    width: 18px;
    margin-left: 5px;
}

.gmap {
    background-color: #212730;
    border-radius: 20px;
    margin: 2rem auto;
    height: 72vh;
    padding: 2rem;
}

h1 {
    color: white;
    margin: 0 auto 0.2rem;
}

#map {
    width: 80%;
    height: 500px;
    border-radius: 30px;
    margin: 2rem auto;
}
</style>