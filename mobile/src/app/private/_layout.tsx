import React from "react";
import { Drawer } from "expo-router/drawer";

const PrivateLayout: React.FC = () => {
    return (
        <Drawer>
            <Drawer.Screen name="index" />
        </Drawer>
    );
};

export default PrivateLayout;
