interface ContainerProps {
  children: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <div className="container flex flex-col mx-auto p-4 gap-8 bg-white">{children}</div>;
};

export default Container;