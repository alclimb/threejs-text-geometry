import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// ページロード完了イベント
window.onload = async function () {
  // DOMを取得
  const appElement = document.querySelector<HTMLElement>(`#myApp`)!;

  // フォントローダー
  const fontLoader = new FontLoader();

  // フォントを読み込む
  const font = await fontLoader.loadAsync(`/fonts/droid_sans_mono_regular.typeface.json`);

  // テキストメッシュ
  const textGeometry = new TextGeometry(`TextGeometry Scene`, {
    font: font,
    size: 10,
    height: 1,
  });
  textGeometry.translate(-100, 10, 0);
  textGeometry.scale(0.01, 0.01, 0.01);
  const textMesh = new THREE.Mesh(textGeometry, new THREE.MeshBasicMaterial({ color: `#ccc` }));
  // textMesh.position.set(-100, 10, 0);
  // textMesh.scale.set(0.01, 0.01, 0.01);

  // 座表軸
  const axes = new THREE.AxesHelper();

  // シーンを初期化
  const scene = new THREE.Scene();
  scene.add(textMesh);
  scene.add(axes);

  // カメラを初期化
  const camera = new THREE.PerspectiveCamera(
    50,
    appElement.offsetWidth / appElement.offsetHeight,
    0.01,
    1000
  );
  camera.position.set(1, 1, 1);
  camera.lookAt(scene.position);

  // レンダラーの初期化
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: appElement });
  renderer.setClearColor(0xffffff, 1.0);
  renderer.setSize(appElement.offsetWidth, appElement.offsetHeight);
  renderer.shadowMap.enabled = true; // レンダラー：シャドウを有効にする

  // カメラコントローラー設定
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.maxPolarAngle = Math.PI * 0.5;
  orbitControls.minDistance = 0.1;
  orbitControls.maxDistance = 100;
  orbitControls.autoRotate = false; // カメラの自動回転設定
  orbitControls.autoRotateSpeed = 1.0; // カメラの自動回転速度

  // 描画ループを開始
  renderer.setAnimationLoop(() => {
    // カメラコントローラーを更新
    orbitControls.update();

    // 描画する
    renderer.render(scene, camera);
  });
}
