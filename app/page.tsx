"use client" ;

import { DeviceList } from "./component/DeviceList";
import { DevicesManager } from "./component/DeviceManager";
import { DeviceMirror } from "./component/DeviceMirror";

export default function Home() {
  return (
    <main>
      <DevicesManager />
    </main>
  );
}
