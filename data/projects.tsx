export const projectsData = [
  {
    id: 1,
    slug: "mlp_services", 
    title: "Multilayer Perceptron Services",
    type: "MLP Models",
    
    description_short: "MLP services made with PyTorch, and deployed on Google Cloud.",
    
    description_large: "This project consists of a suite of Multilayer Perceptron models trained from scratch using PyTorch. The architecture is fully containerized with Docker and served through a FastAPI Gateway deployed on Google Cloud Run, ensuring high availability and secure authentication via OIDC tokens.",
    technologies: ["PyTorch", "FastAPI", "Google Cloud Run", "Docker", "Python"],
    goals: ["Build a robust deep learning API", "Implement secure service-to-service communication", "Achieve sub-100ms inference time"],
  },
  {
    id: 2,
    slug: "customer_churn",
    title: "Customer Churn Prediction",
    type: "Classification Model",
    description_short: "Predicts if a user will leave the platform based on usage data.",
    description_large: "A binary classification model that analyzes customer behavioral patterns, billing history, and engagement metrics to assign a churn probability score. Used by the retention team to offer proactive discounts.",
    technologies: ["Scikit-Learn", "Pandas", "XGBoost", "FastAPI"],
    goals: ["Identify at-risk customers", "Reduce monthly churn rate by 5%"],
  }
];