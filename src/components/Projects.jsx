import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "3D Wesite",
    url: "https://www.instagram.com/reel/CvrAN3Grjpq/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
    image: "projects/1.jpg",
    description: "Creating the Atmos Awwwards website with React Three Fiber",
  },
  {
    title: "3D Portfolio",
    url: "https://forms.gle/qKDCKzX7wSQdm2yz6",
    image: "projects/baking.jpg",
    description: "Learn how to bake a 3D model with Blender and use it in r3f",
  },
  {
    title: "3D Avatar",
    url: "https://forms.gle/qKDCKzX7wSQdm2yz6",
    image: "projects/2.jpg",
    description: "Learn how to use ReadyPlayerMe to create a 3D avatar",
  },
  {
    title: "Softwares",
    url: "https://forms.gle/qKDCKzX7wSQdm2yz6",
    image: "projects/3.jpg",
    description: "Use python and other necessary languages to develop softwares",
  },
  {
    title: "Branding",
    url: "https://forms.gle/qKDCKzX7wSQdm2yz6",
    image: "projects/4.jpg",
    description: "Create a leading Personal Brand of You / your Company ",
  },
  {
    title: "Developer",
    url: "https://forms.gle/qKDCKzX7wSQdm2yz6",
    image: "projects/5.jpg",
    description: "Create a Futurestic App for You / your Company ",
  },
  {
    title: "Digital Marketing",
    url: "https://forms.gle/qKDCKzX7wSQdm2yz6",
    image: "projects/6.jpg",
    description: "Create a cutting edge marketing startegy for You / your Company ",
  },
  {
    title: "E-commerce",
    url: "https://forms.gle/qKDCKzX7wSQdm2yz6",
    image: "projects/7.jpg",
    description: "Create a Futurestic E-commerce websites & App for You / your Company ",
  },
  {
    title: "Video Production",
    url: "https://forms.gle/qKDCKzX7wSQdm2yz6",
    image: "projects/8.jpg",
    description: "Create a Futurestic video for You / your Company ",
  },
  {
    title: "AR / VR Developer",
    url: "https://forms.gle/qKDCKzX7wSQdm2yz6",
    image: "projects/9.jpg",
    description: "Create a Futurestic AR / VR Softwares ",
  },
  {
    title: "AR / VR Game Developer",
    url: "https://forms.gle/qKDCKzX7wSQdm2yz6",
    image: "projects/10.jpg",
    description: "Create a Futurestic AR / VR Games for You / your Company ",
  },
  
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
