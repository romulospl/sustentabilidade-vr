imagens_none=$(docker images -f "dangling=true" -q)

# Remove as imagens
if [[ ! -z "$imagens_none" ]]; then
  docker rmi -f $imagens_none
fi

docker rm -f sustentabilidade-vr

docker build -t sustentabilidade .

docker run -p 80:80 -p 443:443 -d --name sustentabilidade-vr sustentabilidade


