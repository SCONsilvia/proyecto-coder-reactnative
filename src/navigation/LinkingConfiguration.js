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
                
                    Upload: {
                        screens: {
                            UploadImageScreen: "upload",
                            UploadDetailsScreen: "upload/details",
                        },
                    },
                },
            }
        },
    },
};

export default linking;
