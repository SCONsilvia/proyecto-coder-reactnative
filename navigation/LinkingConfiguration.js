//Deep Link
const linking = {
    prefixes: ["miapp://"],

    config: {
        screens: {
            Tabs: {
                initialRouteName: "Home",
                
                screens: {

                    Home: {
                        screens: {
                            HomeMain: "home",
                            AddDrawing: "draw",
                        },
                    },

                    Gallery: {
                        screens: {
                            GalleryMain: "gallery",
                            GalleryDetail: "gallery/:imageId",
                        },
                    },

                    Settings: {
                        screens: {
                            SettingsMain: "settings",
                        },
                    },
                },
            },
        },
    },
};

export default linking;
