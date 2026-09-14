import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { MoleculeStructure } from "../../types/chemistry";
import { getElementVisual } from "./elementColors";
import "./MoleculeViewer3D.css";

const BOND_RADIUS = 0.09;
const ATOM_SCALE = 0.011; // pm -> scene units, applied on top of a base radius so atoms stay visually distinct but bonds remain visible

function atomVisualRadius(radiusPm: number): number {
  return 0.28 + radiusPm * ATOM_SCALE;
}

export function MoleculeViewer3D({ structure }: { structure: MoleculeStructure }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(3, 4, 5);
    const fill = new THREE.DirectionalLight(0xffffff, 0.35);
    fill.position.set(-4, -2, -3);
    scene.add(ambient, key, fill);

    const group = new THREE.Group();
    scene.add(group);

    // Atoms
    const positions = structure.atoms.map((a) => new THREE.Vector3(a.x3d, a.y3d, a.z3d));
    let maxExtent = 1;
    for (const p of positions) maxExtent = Math.max(maxExtent, p.length());

    structure.atoms.forEach((atom, i) => {
      const visual = getElementVisual(atom.element);
      const geometry = new THREE.SphereGeometry(atomVisualRadius(visual.radiusPm), 24, 18);
      const material = new THREE.MeshStandardMaterial({ color: visual.color, roughness: 0.45, metalness: 0.08 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(positions[i]!);
      group.add(mesh);
    });

    // Bonds
    for (const bond of structure.bonds) {
      const p1 = positions[bond.atomIndex1];
      const p2 = positions[bond.atomIndex2];
      if (!p1 || !p2) continue;

      if (bond.type === "ionic") {
        const material = new THREE.LineDashedMaterial({ color: 0x7c8b93, dashSize: 0.12, gapSize: 0.08 });
        const geometry = new THREE.BufferGeometry().setFromPoints([p1, p2]);
        const line = new THREE.Line(geometry, material);
        line.computeLineDistances();
        group.add(line);
        continue;
      }

      const direction = new THREE.Vector3().subVectors(p2, p1);
      const length = direction.length();
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const orientation = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());

      const perpendicular = new THREE.Vector3(1, 0, 0).cross(direction).normalize();
      const perpVector = perpendicular.lengthSq() > 0 ? perpendicular : new THREE.Vector3(0, 0, 1);
      const offsets = bond.order === 1 ? [0] : bond.order === 2 ? [-0.09, 0.09] : [-0.16, 0, 0.16];

      for (const offset of offsets) {
        const geometry = new THREE.CylinderGeometry(BOND_RADIUS, BOND_RADIUS, length, 12);
        const material = new THREE.MeshStandardMaterial({ color: 0x46565f, roughness: 0.5 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(mid).addScaledVector(perpVector, offset);
        mesh.quaternion.copy(orientation);
        group.add(mesh);
      }
    }

    camera.position.set(0, 0, Math.max(3, maxExtent * 3.2));
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.minDistance = 1;
    controls.maxDistance = 20;

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      controls.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose();
          const material = obj.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [structure]);

  return <div ref={containerRef} className="molecule-3d" aria-label="Interactive 3D molecular structure (drag to rotate, scroll to zoom)" />;
}
