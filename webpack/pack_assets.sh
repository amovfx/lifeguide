


#https://github.com/devgeniem/docker-node-assets-builder/blob/master/node_install_and_build_webpack.sh

cd /flask_data/src/book/static/js/
npm install
npm run packcss
npm run packjs

cd /flask_data/src/book/templates
python3 /digest_html.py
