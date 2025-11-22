# CervantesClient

Aplicación React organizada con Clean Architecture por features, desarrollada para gestionar exámenes en línea para estudiantes y administradores.
Incluye dashboard administrativo, panel estudiantil con temporizador, vista de resultados, manejo de estado global, validación, notificaciones, modales, integración con Cloudinary y más.

# 🚀 Características principales
## 👨‍🎓 Panel del Estudiante

# 🚀 Tecnologías principales
## Framework y Core
- React 19
- React Router 7
- Vite
- TypeScript

## Estilos y UI
- TailwindCSS
- MUI (Material UI)
- SweetAlert2
- React Toastify

## Estado, Validación y Formularios
- Redux Toolkit
- React Redux
- React Hook Form
- Zod (validaciones tipadas)

## Networking y Servicios
- Axios
- Cloudinary Upload API (para foto de perfil)

## Otros
- React Countdown Circle Timer (temporizador del examen)
- React PDF

```
src/
├── app/                  
│   └── store/            
│               
│                
│
├── features/               # Arquitectura por FEATURES (DDD-like)
│   ├── Category/
│   │   ├── application/   
│   │   ├── domain/        
│   │   ├── infrastructure/
│   │   └── ui/            
│   │
│   ├── Exam/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│   │
│   ├── Question/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/
│   │
│   ├── Role/
│   │   ├── application/
│   │   ├── domain/
│   │   ├── infrastructure/
│   │   └── ui/  
│   │
│   └── User/
│       ├── application/
│       ├── domain/
│       ├── infrastructure/
│       └── ui/            
│
├── assets/      
├── pages/
├── infrastructure/ 
├── components/            
└── main.jsx               
```

## Capturas

<img width="1919" height="906" alt="Captura de pantalla 2025-11-22 001138" src="https://github.com/user-attachments/assets/de6de442-fb1f-47c5-9f07-209d25d26cc6" />

<img width="1919" height="903" alt="Captura de pantalla 2025-11-22 001149" src="https://github.com/user-attachments/assets/45891ee2-1cbf-4190-9672-c08b02f6b4d3" />

<img width="1919" height="901" alt="Captura de pantalla 2025-11-22 001155" src="https://github.com/user-attachments/assets/ddced927-f50f-40b6-85be-7b0abf75f273" />

<img width="1919" height="905" alt="Captura de pantalla 2025-11-22 001158" src="https://github.com/user-attachments/assets/0c3d7e1c-e05a-4d1c-8f93-636d0dad2ef2" />

<img width="1919" height="906" alt="Captura de pantalla 2025-11-22 001202" src="https://github.com/user-attachments/assets/ffe74057-d353-4b2c-b062-9eb8c392b4d6" />

<img width="1919" height="908" alt="Captura de pantalla 2025-11-22 001208" src="https://github.com/user-attachments/assets/4df1be53-b7ed-4e65-98cd-5d0e381c0d86" />

<img width="1918" height="907" alt="Captura de pantalla 2025-11-22 001211" src="https://github.com/user-attachments/assets/2f2632e4-d35c-40d4-b9d5-05745bc4c6d5" />

<img width="1919" height="908" alt="Captura de pantalla 2025-11-22 001215" src="https://github.com/user-attachments/assets/5448980b-1954-494a-85b9-1120e3150eac" />

<img width="1919" height="913" alt="Captura de pantalla 2025-11-22 001219" src="https://github.com/user-attachments/assets/76c193e4-3efa-45c6-ae3d-5e81324dc792" />

<img width="1919" height="906" alt="Captura de pantalla 2025-11-22 001223" src="https://github.com/user-attachments/assets/d2eb40ce-07cd-4fcd-b67d-99d1fd7d7712" />

<img width="1917" height="897" alt="Captura de pantalla 2025-11-22 001534" src="https://github.com/user-attachments/assets/d1267b54-6f61-4ad8-b912-1170615ab3ae" />

<img width="1915" height="896" alt="Captura de pantalla 2025-11-22 001543" src="https://github.com/user-attachments/assets/f1fd960e-5e18-44ee-9d9f-cca12e1c9f40" />

<img width="1917" height="900" alt="Captura de pantalla 2025-11-22 001600" src="https://github.com/user-attachments/assets/3e2a3afc-84b0-4688-941b-d1db08993f58" />

<img width="1916" height="897" alt="Captura de pantalla 2025-11-22 001604" src="https://github.com/user-attachments/assets/ab4db11d-4993-4b74-80ff-04120155e068" />

<img width="1917" height="897" alt="Captura de pantalla 2025-11-22 001608" src="https://github.com/user-attachments/assets/ce9f0a07-6b28-4652-b3bc-334b9bf7ba68" />

<img width="1917" height="908" alt="Captura de pantalla 2025-11-22 001611" src="https://github.com/user-attachments/assets/ca5dd0d9-f1d7-4845-9d3c-97518c44e550" />

<img width="1919" height="905" alt="Captura de pantalla 2025-11-22 001624" src="https://github.com/user-attachments/assets/bb1372e1-6aab-478b-9da6-119c5e0f0d00" />

<img width="1919" height="908" alt="Captura de pantalla 2025-11-22 001634" src="https://github.com/user-attachments/assets/cc4576f7-e143-44b1-afcc-4beb5dd94e02" />

<img width="1919" height="907" alt="Captura de pantalla 2025-11-22 001638" src="https://github.com/user-attachments/assets/92c9d0b4-bcb6-4648-8c50-270e9c7d6c61" />

<img width="1919" height="919" alt="Captura de pantalla 2025-11-22 001643" src="https://github.com/user-attachments/assets/0391683c-6ae3-403b-8ab3-7976d66b7157" />

<img width="1919" height="915" alt="Captura de pantalla 2025-11-22 001647" src="https://github.com/user-attachments/assets/a3183425-4b45-44ba-880b-2594aaa31ef3" />

<img width="1916" height="907" alt="Captura de pantalla 2025-11-22 001654" src="https://github.com/user-attachments/assets/5326dee2-3099-4c6a-853d-cdcf0430265b" />

<img width="1917" height="912" alt="Captura de pantalla 2025-11-22 001658" src="https://github.com/user-attachments/assets/efbd5855-e2bf-421d-a872-a94fdb6fef5e" />

<img width="1919" height="918" alt="Captura de pantalla 2025-11-22 001701" src="https://github.com/user-attachments/assets/0aa63146-014a-4c9a-86d3-8b4a08780390" />

<img width="1918" height="963" alt="Captura de pantalla 2025-11-22 001708" src="https://github.com/user-attachments/assets/5c239a00-cdac-4bea-8e39-a19c726dde61" />

<img width="1919" height="914" alt="Captura de pantalla 2025-11-22 001712" src="https://github.com/user-attachments/assets/a30bb4c9-2ae9-4a3f-80f8-66d5d66b4f1e" />
