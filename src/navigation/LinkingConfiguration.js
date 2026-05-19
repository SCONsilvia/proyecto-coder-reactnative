//Deep Link
const linking = {
    prefixes: ["miapp://"],

    config: {
        screens: {

            Auth: {
                screens: {
                    Login: "login",
                    Register: "register",
                },
            },


            App: {
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
                                    GalleryDetail: "gallery/:id",
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
            }
        },
    },
};

export default linking;
