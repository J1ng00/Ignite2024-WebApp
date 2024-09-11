# Ignite2024-WebApp
 This is a webapp created for SIM Ignite 2024 by SIM Career Connect

Install the packages
go get -u gorm.io/gorm   
go get -u gorm.io/driver/postgres   
go get github.com/joho/godotenv  
go get github.com/gofiber/fiber/v2   
go get github.com/gofiber/template/html/v2
go install github.com/githubnemo/CompileDaemon@latest
npm install react react-dom
npm install --save-dev @types/react @types/react-dom
npm install --save-dev esbuild
npm install --save-dev esbuild-sass-plugin
npm install --save react-router-dom       
npm install -D tailwindcss
npx tailwindcss init

starting the DB
net start postgresql-x64-16     

to run 
CompileDaemon --command="./mvc"
npm run dev (builds the site)