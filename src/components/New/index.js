import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './new.css';


class New extends Component {

    constructor(props) {
        super(props)
        this.state = {
            titulo: '',
            descricao: '',
            imagem: '',
            alert: '',
            url: '',
            progress: ''
        }

        this.cadastrar = this.cadastrar.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);

    }

    componentDidMount() {
        if (!firebase.getCurrent()) {
            this.props.history.replace('/')
            return null
        }
    }

    handleFile = async (e) => {
        if (e.target.files[0]) {

            const image = e.target.files[0];

            if (image.type === "image/png" || image.type === "image/jpeg") {
                await this.setState({ imagem: image })
                this.handleUpload();

            } else {
                alert('envie uma imagem do tipo PNG ou JPG')
                this.setState({ iamgem: null });
                return null;
            }

        }

    }

    handleUpload = async () => {

        const { imagem } = this.state;
        const currentUid = firebase.getCurrentUid();

        const uploadTask = firebase.storage
            .ref(`images/${currentUid}/${imagem.name}`)
            .put(imagem);

        await uploadTask.on('state-changed',
            (snapshot) => {
                //caregando
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress: progress })
            },
            (error) => {
                //erro
                console.log(error)
            },
            () => {
                //sucesso
                firebase.storage.ref(`images/${currentUid}`)
                    .child(imagem.name).getDownloadURL()
                    .then((url) => {
                        this.setState({ url: url })
                    })
            })

    }

    cadastrar = async (e) => {
        e.preventDefault();
        if (this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !== ''
            && this.state.imagem !== null && this.state.url !== '') {
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: this.state.titulo,
                imagem: this.state.url,
                descrição: this.state.descricao,
                autor: localStorage.nome
            });

            this.props.history.push('/dashboard');

        } else {
            this.setState({ alert: 'Preencha todos os campos!' })
        }


    }


    render() {
        return (
            <div>
                <header id='new'><Link to='/dashboard'>Voltar</Link></header>
                <form onSubmit={this.cadastrar} id='new-post'>

                    <input type='file'
                        onChange={this.handleFile} /><br />
                    {this.state.url !== ''
                        ? <img src={this.state.url} height='150' width='250' alt='capa do post' />
                        : <progress value={this.state.progress} />}

                    <span>{this.state.alert}</span>
                    <label>Titulo: </label><br />
                    <input type='text' placeholder='Digite o titulo' value={this.state.nome} autoFocus
                        onChange={(e) => this.setState({ titulo: e.target.value })} /><br />



                    <label>Descrição: </label><br />
                    <textarea type='text' placeholder='Alguma descrição...' value={this.state.descricao}
                        onChange={(e) => this.setState({ descricao: e.target.value })} /><br />

                    <button type='submit'>Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default withRouter(New);